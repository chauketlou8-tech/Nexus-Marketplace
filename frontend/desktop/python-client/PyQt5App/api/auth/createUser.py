import requests
from ...utils.Address import address
import os

class CreateUser:
    def __init__(self, name, email, password, year):
        self.name = name
        self.email = email
        self.password = password
        self.year = year
        self.addr = address()

    def create(self):
        response = requests.post(
            f"{self.addr}/auth/register",
            json={
                "name": self.name,
                "pythonEmail": self.email,
                "password": self.password,
                "year": self.year
            }
        )

        response.raise_for_status()
        data = response.json()

        token = data.get("token")
        refresh_token = data.get("refreshToken")

        if not token or not refresh_token:
            raise Exception(data.get("message", "Login failed"))

        appdata = os.getenv("APPDATA")
        if not appdata:
            appdata = os.path.expanduser("~/.config")

        session_dir = os.path.join(appdata, "NexusMarketplace")
        os.makedirs(session_dir, exist_ok=True)

        session_path = os.path.join(session_dir, ".session")

        with open(session_path, "w") as session_file:
            session_file.write(f"Token: Bearer {token}\n")

            if refresh_token:
                session_file.write(f"Refresh Token: {refresh_token}\n")

        return data.get("user")