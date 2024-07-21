import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
  status: String,
  rootCause: String,
  started: Date,
  duration: Number, // in minutes
});

const MonitorSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  monitor_type: { type: String, enum: ['http', 'ping'], required: true },
  url_or_ip: { type: String, required: true },
  notification_emails: [String],
  notification_phones: [String],
  interval: { type: Number, required: true },
  note: String,
  latest_incident: IncidentSchema,
  incidents24h: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastChecked: { type: String },
  successfulChecks: { type: Number, default: 0 },
  failedChecks: { type: Number, default: 0},
  status: { type: String }
});

const Monitor = mongoose.models.Monitor || mongoose.model('Monitor', MonitorSchema);

export default Monitor; 