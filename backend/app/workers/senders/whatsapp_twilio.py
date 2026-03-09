from app.core.config import settings

def send_whatsapp(to_phone: str, message: str):
    """
    Replace with Twilio SDK call.
    """
    if not settings.TWILIO_ACCOUNT_SID:
        # For dev/testing
        print("[DEV] WhatsApp to", to_phone, ":", message)
        return

    # Example (pseudo):
    # from twilio.rest import Client
    # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    # client.messages.create(
    #     from_=settings.TWILIO_WHATSAPP_FROM,
    #     to=f"whatsapp:{to_phone}",
    #     body=message
    # )
