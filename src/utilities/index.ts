const getRootDomain = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};


export {getRootDomain}