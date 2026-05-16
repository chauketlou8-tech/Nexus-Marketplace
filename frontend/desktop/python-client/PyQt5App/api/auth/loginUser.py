import requests
import os
from ...utils.Address import address

class LoginUser:
    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.addr = address()

    def login(self):
        response = requests.post(
            f"{self.addr}/api/auth/login",
            json={"email": self.email, "password": self.password},
            headers={"Content-Type": "application/json"}
        )

        try:
            data = response.json()
        except ValueError:
            raise Exception(f"Non‑JSON error: {response.text}")

        if response.status_code == 200:
            token = data.get("token")
            refresh_token = data.get("refreshToken")
            user = data.get("user")

            if not token or not refresh_token or not user:
                raise Exception(data.get("message", "Login failed"))

            appdata = os.getenv("APPDATA") or os.path.expanduser("~/.config")
            session_dir = os.path.join(appdata, "NexusMarketplace")
            os.makedirs(session_dir, exist_ok=True)

            session_path = os.path.join(session_dir, ".session")
            with open(session_path, "w") as session_file:
                session_file.write(f"Token: Bearer {token}\n")
                if refresh_token:
                    session_file.write(f"Refresh Token: {refresh_token}\n")

            return user
        else:
            raise Exception(data.get("message", f"Error {response.status_code}"))