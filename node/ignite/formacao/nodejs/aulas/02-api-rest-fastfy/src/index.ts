interface User {
    birthYear: number
}

function calculateAgeOfYears(user: User){
    return new Date().getFullYear() - user.birthYear
}

calculateAgeOfYears({
    birthYear: 1992
}) 