import SchoolApplications from '../components/application/SchoolApplications'
function SchoolApplicationsUnderReview() {
    const filter = 'all'
    return (
        <div>
            <SchoolApplications filter={filter} />
        </div>
    )
}

export default SchoolApplicationsUnderReview
