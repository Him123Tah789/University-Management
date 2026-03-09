def render_message(template_key: str, payload: dict) -> dict:
    """
    Return dict with keys: subject (optional), text
    """
    if template_key == "order_confirm":
        return {"text": f"✅ Payment received! Order #{payload.get('order_id', '')} for {payload.get('class_title', '')}."}

    if template_key == "zoom_link":
        return {"text": f"🎥 Zoom link for {payload.get('class_title', '')}: {payload.get('zoom_link', '')}"}

    if template_key == "class_reminder":
        return {"text": f"⏰ Reminder: {payload.get('class_title', '')} starts at {payload.get('start_time', '')}."}

    if template_key == "expiry_warning":
        return {"text": f"⚠️ Your package for {payload.get('class_title', '')} expires on {payload.get('expiry_date', '')}."}

    return {"text": "Notification"}
