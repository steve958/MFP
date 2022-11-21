export function filterType(array) {
    return array.filter(project => project.projectType === 'freezanz' && project.status === 'aktivan')
}

export function calcDepletion(workTime, consumption, nozzles, refillAmount, refillDate) {
    const now = new Date()
    const time = now.getTime()
    const refill = new Date(refillDate).getTime()
    const dailyConsumption = nozzles * (consumption / 100) * (workTime / 60) * 40
    const daysLeftUntilDepletion = Math.floor(refillAmount / dailyConsumption)
    const reservoir = refill + (daysLeftUntilDepletion * 24 * 60 * 60 * 1000)
    return Math.abs(Math.floor((time - reservoir) / 1000 / 60 / 60 / 24))
}

