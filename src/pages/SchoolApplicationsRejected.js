import SchoolApplications from '../components/application/SchoolApplications'
function SchoolApplicationsUnderReview() {
    const filter = 'Not Approved'
    return (
        <div>
            <SchoolApplications filter={filter} />
        </div>
    )
}

export default SchoolApplicationsUnderReview
