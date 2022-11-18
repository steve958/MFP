export function filterType(array) {
    return array.filter(project => project.projectType === 'freezanz' && project.status === 'aktivan')
}

export function calcDepletion(workTime, consumption, nozzles, refillAmount) {
    const dailyConsumption = nozzles * (consumption / 100) * (workTime / 60) * 40
    const daysLeftUntilDepletion = Math.floor(refillAmount / dailyConsumption)
    return daysLeftUntilDepletion
}