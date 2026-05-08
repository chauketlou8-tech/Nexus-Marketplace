export default function formatInit(name: string) : string {
    if (!name) return "";

    const splitName: string[] = name.split(' ');
    let initials: string = "";

    if (splitName.length == 1) {
        initials += splitName[0].charAt(0).toUpperCase() + splitName[0].charAt(1).toUpperCase();
    }
    else if (splitName.length >= 2) {
        initials += splitName[0].charAt(0).toUpperCase() + splitName[splitName.length - 1].charAt(0).toUpperCase();
    }

    return initials;
}