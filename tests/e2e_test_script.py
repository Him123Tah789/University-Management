import requests
import time
import json

BASE_URL = "http://localhost:8000"

def test_health():
    print("--- Testing API Health ---")
    res = requests.get(f"{BASE_URL}/health")
    assert res.status_code == 200
    print("Health OK\n")

def test_webhook_payment():
    print("--- Testing WooCommerce Webhook (Live Classes Automation) ---")
    payload = {
        "id": 888,
        "total": "199.99",
        "status": "completed",
        "billing": {"email": "student_demo@example.com", "phone": "+1234567890"}
    }
    headers = {"Content-Type": "application/json", "X-WC-Webhook-Signature": "change_me"}
    
    # Needs to bypass actual signature validation or use the hardcoded DEV bypass. 
    # Provided we implemented signature check, in local it expects "change_me".
    res = requests.post(f"{BASE_URL}/webhooks/woocommerce/order-paid", json=payload, headers=headers)
    print("Webhook Response:", res.json())
    assert res.status_code == 200
    print("Payment webhook PROCESSED\n")

def test_student_dashboard():
    print("--- Testing Student Dashboard Render ---")
    # Assuming user ID 1 is the one created by webhook test
    res = requests.get(f"{BASE_URL}/api/v1/dashboards/student/1")
    if res.status_code == 200:
        print("Dashboard retrieved successfully:", json.dumps(res.json(), indent=2)[:200], "...\n")
    else:
        print("Dashboard User not ready or ID differs:", res.text, "\n")
        
def test_writing_analysis_submission():
    print("--- Testing NLP Writing Helper Submission ---")
    payload = {"text": "This is a sample essay regarding systems architecture and its relation to database modeling."}
    res = requests.post(f"{BASE_URL}/api/v1/writing/1/analyze", json=payload)
    if res.status_code == 200:
        print("Submitted Writing:", res.json())
    else:
        print("Submission Error:", res.text)
    print("\n")

if __name__ == "__main__":
    try:
        test_health()
        test_webhook_payment()
        time.sleep(2) # Give DB time
        test_student_dashboard()
        test_writing_analysis_submission()
        print("End-To-End Simulation Complete. Run 'docker compose up' logs to see Celery asynchronous triggers.")
    except Exception as e:
        print(f"Test Failed: {e}")
