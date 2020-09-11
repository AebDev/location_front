import React,{useState , useEffect} from 'react'
import { Icon, Pagination } from 'semantic-ui-react'

const PaginationBar = (props) => {

  const [active,setActive] = useState(1);

   useEffect(() => {
    props.setCurrentPage(active);
   }, [active])

   const changeHundle = (event,data) =>{

     if(event.target.type == 'pageItem'){
      setActive(event.target.text);
     }
   }

    return (
      <Pagination
    defaultActivePage={active}
    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true}}
    firstItem={{ content: <Icon name='angle double left' />, icon: true , onClick : ()=>(active > 1 ? setActive(1) : '')}}
    lastItem={{ content: <Icon name='angle double right' />, icon: true , onClick : ()=>(active < props.total ? setActive(props.total) : '') }}
    prevItem={{ content: <Icon name='angle left' />, icon: true , onClick : ()=>(active > 1 ? setActive(active-1) : '')}}
    nextItem={{ content: <Icon name='angle right' />, icon: true , onClick : ()=>(active < props.total ? setActive(active+1) : '')}}
    totalPages={props.total}
    style={{margin:'auto'}}
    onClick ={changeHundle}
  />
    )
  }

export default PaginationBar
