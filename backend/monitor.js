import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
  status: String,
  rootCause: String,
  started: Date,
  duration: Number, // in minutes
});

const MonitorSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  monitorType: { type: String, enum: ['http', 'ping'], required: true },
  urlOrIp: { type: String, required: true },
  notificationEmails: [String],
  notificationPhones: [String],
  interval: { type: Number, required: true },
  note: String,
  latestIncident: IncidentSchema,
  incidents24h: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Monitor = mongoose.models.Monitor || mongoose.model('Monitor', MonitorSchema);

export default Monitor; 