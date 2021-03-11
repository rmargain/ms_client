import SchoolApplications from '../components/application/SchoolApplications'
function SchoolApplicationsUnderReview() {
    const filter = 'Approved'
    return (
        <div>
            <SchoolApplications filter={filter} />
        </div>
    )
}

export default SchoolApplicationsUnderReview
