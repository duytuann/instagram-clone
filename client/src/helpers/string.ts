export const isEmptyInput = (str: string | undefined): boolean => {
    if (str == null) return true;

    return str.trim() === '';
};

export const isImageFormat = (file: File) => file['type'].startsWith('image');
