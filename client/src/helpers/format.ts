export const displayLikeCounts = (items: any[], displayed: string): string => {
    return `${items.length} ${displayed}${items.length > 1 ? 's' : ''}`;
};

export const getNameInMail = (mail?: string): string => {
    return mail == null ? 'John Smith' : mail.split('@')[0];
};

export const commaBetweenNumbers = (num: number) => num.toLocaleString();
