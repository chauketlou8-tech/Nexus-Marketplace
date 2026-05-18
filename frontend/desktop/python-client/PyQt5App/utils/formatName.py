def formatName(name):
    if not name:
        return ""

    split_name = name.split(" ")
    initials = ""

    if len(split_name) == 1:
        initials += split_name[0][0].upper() + split_name[0][1].upper()

    elif len(split_name) >= 2:
        initials += split_name[0][0].upper() + split_name[len(split_name)-1][0].upper()

    return initials