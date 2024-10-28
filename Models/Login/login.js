const LoginSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
      description: "Reference to the user from the Signup schema",
    },
    auth_token: {
      type: String,
      required: true,
      minlength: 30,
      select: false, // Excludes token from queries unless explicitly selected
      description: "Authentication token for session management",
    },
    last_login: {
      type: Date,
      default: Date.now,
      description: "Records the timestamp of the last login",
    },
    login_ip: {
      type: String,
      required: true,
      description: "IP address of the user at login time",
    },
    device_info: {
      type: String,
      default: "Unknown Device",
      description: "Device information for the login session",
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;
