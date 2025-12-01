export const emailRegexp: RegExp = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
export const passwordRegexp: RegExp = /^(?=.*[A-Za-zA-Яа-яЁё])(?=.*\d)[A-Za-zA-Яа-яЁё\d]+$/;
export const usernameRegexp: RegExp = /^[A-Za-zА-Яа-яЁё0-9_-]+$/;
export const fullnameRegexp: RegExp = /^[A-Za-zА-Яа-яЁё\s]+$/;

