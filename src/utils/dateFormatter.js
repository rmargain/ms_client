import moment from 'moment'

export const formattedDate = (date) =>{
    return (
        moment(date).format("MMM D YYYY")
    )
}