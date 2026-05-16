import os

####DO NOT TOUCH####

#get the stored token and refresh token and also clears the tokens on logout
class SessionManager:
    def __init__(self):
        pass

    @staticmethod
    def get_session_path():
        appdata = os.getenv("APPDATA")
        if not appdata:
            appdata = os.path.expanduser("~/.config")

        session_dir = os.path.join(appdata, "NexusMarketplace")
        session_path = os.path.join(session_dir, ".session")
        return session_path

    @staticmethod
    def get_token():
        session_path = SessionManager.get_session_path()

        if not os.path.exists(session_path):
            return None

        with open(session_path, "r") as session_file:
            lines = session_file.readlines()
            for line in lines:
                if line.startswith("Token:"):
                    return line.split("Token: ")[1].strip()
        return None

    @staticmethod
    def get_refresh_token():
        session_path = SessionManager.get_session_path()

        if not os.path.exists(session_path):
            return None

        with open(session_path, "r") as session_file:
            lines = session_file.readlines()
            for line in lines:
                if line.startswith("Refresh Token:"):
                    return line.split("Refresh Token: ")[1].strip()
        return None

    @staticmethod
    def clear_session():
        session_path = SessionManager.get_session_path()
        if os.path.exists(session_path):
            os.remove(session_path)