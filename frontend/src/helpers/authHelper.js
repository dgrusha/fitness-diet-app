export function getCurrentUser() {
    let token;
    const user = sessionStorage.getItem('user');
    try {
        token = user;
    } catch (e) {
        return undefined;
    }
    return token;
}

export function isAuthenticated() {
    const user = getCurrentUser();
    if(user) {
        return true;
    }
    return false;
}

export function hasPassedObligatoryForm(){
    const hasForm = sessionStorage.getItem('hasForm');
    return hasForm;
}