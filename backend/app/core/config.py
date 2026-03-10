import os

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sqlite.db")
    REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

    # Woo webhook verification (shared secret)
    WOOCOMMERCE_WEBHOOK_SECRET = os.getenv("WOOCOMMERCE_WEBHOOK_SECRET", "change_me")

    # Twilio WhatsApp
    TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
    TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
    TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")

    # SMTP
    SMTP_HOST = os.getenv("SMTP_HOST", "")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER = os.getenv("SMTP_USER", "")
    SMTP_PASS = os.getenv("SMTP_PASS", "")

settings = Settings()
