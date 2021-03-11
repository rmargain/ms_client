import SchoolApplications from '../components/application/SchoolApplications'
function SchoolApplicationsUnderReview() {
    const filter = 'Under Review'
    return (
        <div>
            <SchoolApplications filter={filter} />
        </div>
    )
}

export default SchoolApplicationsUnderReview
