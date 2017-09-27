//Action Creator

export function trackCompanyAction(newTrackedCompanies) {
    return {
        type: 'TRACK_COMPANY',
        payload: newTrackedCompanies
    }
}