import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase client with service role for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to authenticate user
async function authenticateUser(authHeader: string | null) {
  if (!authHeader) {
    return { error: 'No authorization header', user: null };
  }
  
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return { error: 'Unauthorized', user: null };
  }
  
  return { error: null, user };
}

// Health check endpoint
app.get("/make-server-537e70fa/health", (c) => {
  return c.json({ status: "ok" });
});

// Debug endpoint - mostra dados do KV store
app.get("/make-server-537e70fa/debug/kv", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    console.log('=== DEBUG KV STORE ===');
    
    // 1. Buscar todos os usuários
    const allUsers = await kv.getByPrefix('user:');
    console.log('All users:', allUsers);
    
    // 2. Filtrar doutores
    const doctors = allUsers.filter((u: any) => u?.userType === 'doctor');
    console.log('Doctors:', doctors);
    
    // 3. Para cada doutor, buscar seus slots
    const doctorDetails = [];
    for (const doctor of doctors) {
      const slotIds = await kv.get(`doctor:availability:${doctor.id}`) || [];
      console.log(`Slot IDs for doctor ${doctor.id}:`, slotIds);
      
      let slots = [];
      if (slotIds.length > 0) {
        slots = await kv.mget(slotIds.map((id: string) => `availability:${id}`));
        console.log(`Slots for doctor ${doctor.id}:`, slots);
      }
      
      doctorDetails.push({
        doctor,
        slotIds,
        slots,
        slotCount: slots.length
      });
    }
    
    // 4. Buscar informações do usuário atual
    const currentUserProfile = await kv.get(`user:${user.id}`);
    
    return c.json({
      currentUser: {
        id: user.id,
        email: user.email,
        profile: currentUserProfile
      },
      allUsersCount: allUsers.length,
      allUsers,
      doctorsCount: doctors.length,
      doctorDetails,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============ AUTH ROUTES ============

// Sign up
app.post("/make-server-537e70fa/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, userType } = body;
    
    if (!email || !password || !name || !userType) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, userType }, // 'patient' or 'doctor'
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }
    
    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      userType,
      createdAt: new Date().toISOString()
    });
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get user profile
app.get("/make-server-537e70fa/auth/profile", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const profile = await kv.get(`user:${user.id}`);
  
  return c.json({ profile });
});

// ============ APPOINTMENT ROUTES ============

// Create appointment
app.post("/make-server-537e70fa/appointments", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const body = await c.req.json();
    const { date, time, type, notes } = body; // type: 'online' or 'presencial'
    
    const appointmentId = crypto.randomUUID();
    const appointment = {
      id: appointmentId,
      patientId: user.id,
      date,
      time,
      type,
      notes,
      status: 'pending', // pending, confirmed, completed, cancelled
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`appointment:${appointmentId}`, appointment);
    
    // Add to patient's appointments list
    const patientAppointments = await kv.get(`patient:appointments:${user.id}`) || [];
    patientAppointments.push(appointmentId);
    await kv.set(`patient:appointments:${user.id}`, patientAppointments);
    
    // Add to all appointments list
    const allAppointments = await kv.get('appointments:all') || [];
    allAppointments.push(appointmentId);
    await kv.set('appointments:all', allAppointments);
    
    return c.json({ success: true, appointment });
  } catch (error) {
    console.log('Create appointment error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get patient appointments
app.get("/make-server-537e70fa/appointments/patient", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const appointmentIds = await kv.get(`patient:appointments:${user.id}`) || [];
    const appointments = await kv.mget(appointmentIds.map((id: string) => `appointment:${id}`));
    
    // Get patient profile for each appointment
    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (apt: any) => {
        const patient = await kv.get(`user:${apt.patientId}`);
        return { ...apt, patient };
      })
    );
    
    return c.json({ appointments: appointmentsWithDetails });
  } catch (error) {
    console.log('Get patient appointments error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get all appointments (doctor only)
app.get("/make-server-537e70fa/appointments/all", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify user is doctor
    const profile = await kv.get(`user:${user.id}`);
    if (profile?.userType !== 'doctor') {
      return c.json({ error: 'Unauthorized - Doctor only' }, 403);
    }
    
    const appointmentIds = await kv.get('appointments:all') || [];
    const appointments = await kv.mget(appointmentIds.map((id: string) => `appointment:${id}`));
    
    // Get patient profile for each appointment
    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (apt: any) => {
        const patient = await kv.get(`user:${apt.patientId}`);
        return { ...apt, patient };
      })
    );
    
    return c.json({ appointments: appointmentsWithDetails });
  } catch (error) {
    console.log('Get all appointments error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Update appointment status
app.put("/make-server-537e70fa/appointments/:id", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const appointmentId = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;
    
    const appointment = await kv.get(`appointment:${appointmentId}`);
    
    if (!appointment) {
      return c.json({ error: 'Appointment not found' }, 404);
    }
    
    // Update appointment
    const updatedAppointment = { ...appointment, status };
    await kv.set(`appointment:${appointmentId}`, updatedAppointment);
    
    return c.json({ success: true, appointment: updatedAppointment });
  } catch (error) {
    console.log('Update appointment error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============ PATIENT RECORDS ROUTES ============

// Create/Update patient record
app.post("/make-server-537e70fa/records", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify user is doctor
    const profile = await kv.get(`user:${user.id}`);
    if (profile?.userType !== 'doctor') {
      return c.json({ error: 'Unauthorized - Doctor only' }, 403);
    }
    
    const body = await c.req.json();
    const { patientId, content, type } = body; // type: 'note', 'diagnosis', 'prescription'
    
    const recordId = crypto.randomUUID();
    const record = {
      id: recordId,
      patientId,
      doctorId: user.id,
      content,
      type,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`record:${recordId}`, record);
    
    // Add to patient's records list
    const patientRecords = await kv.get(`patient:records:${patientId}`) || [];
    patientRecords.push(recordId);
    await kv.set(`patient:records:${patientId}`, patientRecords);
    
    return c.json({ success: true, record });
  } catch (error) {
    console.log('Create record error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get patient records
app.get("/make-server-537e70fa/records/:patientId", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const patientId = c.req.param('patientId');
    
    // Verify user is doctor or the patient themselves
    const profile = await kv.get(`user:${user.id}`);
    if (profile?.userType !== 'doctor' && user.id !== patientId) {
      return c.json({ error: 'Unauthorized' }, 403);
    }
    
    const recordIds = await kv.get(`patient:records:${patientId}`) || [];
    const records = await kv.mget(recordIds.map((id: string) => `record:${id}`));
    
    return c.json({ records });
  } catch (error) {
    console.log('Get records error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============ DOCUMENT ROUTES ============

// Upload document metadata (actual file would be in Supabase Storage)
app.post("/make-server-537e70fa/documents", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const body = await c.req.json();
    const { name, type, url } = body;
    
    const documentId = crypto.randomUUID();
    const document = {
      id: documentId,
      patientId: user.id,
      name,
      type,
      url,
      uploadedAt: new Date().toISOString()
    };
    
    await kv.set(`document:${documentId}`, document);
    
    // Add to patient's documents list
    const patientDocuments = await kv.get(`patient:documents:${user.id}`) || [];
    patientDocuments.push(documentId);
    await kv.set(`patient:documents:${user.id}`, patientDocuments);
    
    return c.json({ success: true, document });
  } catch (error) {
    console.log('Upload document error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get patient documents
app.get("/make-server-537e70fa/documents", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const documentIds = await kv.get(`patient:documents:${user.id}`) || [];
    const documents = await kv.mget(documentIds.map((id: string) => `document:${id}`));
    
    return c.json({ documents });
  } catch (error) {
    console.log('Get documents error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============ PATIENT LIST (DOCTOR) ============

// Get all patients (doctor only)
app.get("/make-server-537e70fa/patients", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify user is doctor
    const profile = await kv.get(`user:${user.id}`);
    if (profile?.userType !== 'doctor') {
      return c.json({ error: 'Unauthorized - Doctor only' }, 403);
    }
    
    // Get all appointments to find unique patients
    const appointmentIds = await kv.get('appointments:all') || [];
    const appointments = await kv.mget(appointmentIds.map((id: string) => `appointment:${id}`));
    
    const patientIds = [...new Set(appointments.map((apt: any) => apt.patientId))];
    const patients = await kv.mget(patientIds.map((id: string) => `user:${id}`));
    
    return c.json({ patients });
  } catch (error) {
    console.log('Get patients error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============ VIDEO CALL ROUTES ============

// Create video call session
app.post("/make-server-537e70fa/videocall/create", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const body = await c.req.json();
    const { appointmentId } = body;
    
    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      appointmentId,
      createdBy: user.id,
      status: 'waiting', // waiting, active, ended
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`videocall:${sessionId}`, session);
    
    return c.json({ success: true, session });
  } catch (error) {
    console.log('Create video call error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get video call session
app.get("/make-server-537e70fa/videocall/:sessionId", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    const sessionId = c.req.param('sessionId');
    const session = await kv.get(`videocall:${sessionId}`);
    
    if (!session) {
      return c.json({ error: 'Session not found' }, 404);
    }
    
    return c.json({ session });
  } catch (error) {
    console.log('Get video call error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// ============ AVAILABILITY ROUTES (DOCTOR) ============

// Create availability slot
app.post("/make-server-537e70fa/availability", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  console.log('=== CREATE AVAILABILITY ===');
  console.log('Auth error:', error);
  console.log('User:', user);
  
  if (error || !user) {
    console.log('Unauthorized - no user');
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify user is doctor
    const profile = await kv.get(`user:${user.id}`);
    console.log('Profile:', profile);
    
    if (profile?.userType !== 'doctor') {
      console.log('User is not a doctor');
      return c.json({ error: 'Unauthorized - Doctor only' }, 403);
    }
    
    const body = await c.req.json();
    console.log('Request body:', body);
    
    const { date, startTime, endTime } = body;
    
    if (!date || !startTime || !endTime) {
      console.log('Missing required fields');
      return c.json({ error: 'Missing required fields: date, startTime, endTime' }, 400);
    }
    
    const slotId = crypto.randomUUID();
    const slot = {
      id: slotId,
      doctorId: user.id,
      date,
      startTime,
      endTime,
      createdAt: new Date().toISOString()
    };
    
    console.log('Creating slot:', slot);
    await kv.set(`availability:${slotId}`, slot);
    console.log('Slot saved to KV');
    
    // Add to doctor's availability list
    const doctorSlots = await kv.get(`doctor:availability:${user.id}`) || [];
    console.log('Current doctor slots:', doctorSlots);
    
    doctorSlots.push(slotId);
    await kv.set(`doctor:availability:${user.id}`, doctorSlots);
    console.log('Updated doctor slots:', doctorSlots);
    
    console.log('Success! Returning slot');
    return c.json({ success: true, slot });
  } catch (error) {
    console.log('Create availability error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get doctor availability
app.get("/make-server-537e70fa/availability", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify user is doctor
    const profile = await kv.get(`user:${user.id}`);
    if (profile?.userType !== 'doctor') {
      return c.json({ error: 'Unauthorized - Doctor only' }, 403);
    }
    
    const slotIds = await kv.get(`doctor:availability:${user.id}`) || [];
    const slots = await kv.mget(slotIds.map((id: string) => `availability:${id}`));
    
    return c.json({ slots });
  } catch (error) {
    console.log('Get availability error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Delete availability slot
app.delete("/make-server-537e70fa/availability/:slotId", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify user is doctor
    const profile = await kv.get(`user:${user.id}`);
    if (profile?.userType !== 'doctor') {
      return c.json({ error: 'Unauthorized - Doctor only' }, 403);
    }
    
    const slotId = c.req.param('slotId');
    
    // Remove from doctor's availability list
    const doctorSlots = await kv.get(`doctor:availability:${user.id}`) || [];
    const updatedSlots = doctorSlots.filter((id: string) => id !== slotId);
    await kv.set(`doctor:availability:${user.id}`, updatedSlots);
    
    // Delete the slot
    await kv.del(`availability:${slotId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Delete availability error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get available slots for patients (public for authenticated users)
app.get("/make-server-537e70fa/availability/public", async (c) => {
  const { error, user } = await authenticateUser(c.req.header('Authorization'));
  
  if (error || !user) {
    console.log('Availability public - Unauthorized');
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    console.log('=== GET PUBLIC AVAILABILITY ===');
    
    // Get all doctors (in this case, we'll get the first doctor)
    const allUsers = await kv.getByPrefix('user:');
    console.log('All users count:', allUsers.length);
    
    const doctors = allUsers.filter((u: any) => u?.userType === 'doctor');
    console.log('Doctors found:', doctors.length);
    
    if (doctors.length === 0) {
      console.log('No doctors found, returning empty slots');
      return c.json({ slots: [] });
    }
    
    // Get availability for the first doctor
    const doctorId = doctors[0].id;
    console.log('Doctor ID:', doctorId);
    
    const slotIds = await kv.get(`doctor:availability:${doctorId}`) || [];
    console.log('Slot IDs for doctor:', slotIds);
    
    if (slotIds.length === 0) {
      console.log('No slot IDs found for doctor');
      return c.json({ slots: [] });
    }
    
    const allSlots = await kv.mget(slotIds.map((id: string) => `availability:${id}`));
    console.log('All slots retrieved:', allSlots);
    
    // Filter out null/undefined slots and past dates
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const availableSlots = allSlots.filter((slot: any) => {
      if (!slot || !slot.date) {
        console.log('Slot filtered out (null or no date):', slot);
        return false;
      }
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);
      const isValid = slotDate >= now;
      console.log(`Slot ${slot.id} - Date: ${slot.date}, Valid: ${isValid}`);
      return isValid;
    });
    
    console.log('Final available slots count:', availableSlots.length);
    console.log('Returning slots:', availableSlots);
    
    return c.json({ slots: availableSlots });
  } catch (error) {
    console.log('Get public availability error:', error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);