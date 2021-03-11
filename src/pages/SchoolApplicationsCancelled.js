import SchoolApplications from '../components/application/SchoolApplications'
function SchoolApplicationsUnderReview() {
    const filter = 'Cancelled'
    return (
        <div>
            <SchoolApplications filter={filter} />
        </div>
    )
}

export default SchoolApplicationsUnderReview
