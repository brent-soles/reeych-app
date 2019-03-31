// import React, { useState } from 'react';
// import { withGetCard } from '../../../containers/Cards/Enhancers';
// // import BtnRender from './general/Buttons';
// // import { PrimaryButtonStyled } from './general/Styles';
// // import { CardLayout, ExpandedCardLayout, H1, H2, P, H1Input } from './general/Styles';
// // import styled from '@emotion/styled';
// // import gql from 'graphql-tag';




// // const Card = ({ data: {title, author, date, meta, ...rest }, ...props}) => {
    
// //     const [formData, setData] = useState({
// //         title,
// //         author,
// //         date,
// //     })

// //     return (
// //     <CardLayout id={`${rest.id}`}>
// //         <H1Input 
// //         name="title" 
// //         type="text" 
// //         value={formData.title}
// //         onChange={(e) => {
// //             e.preventDefault();
// //             setData({
// //                 ...formData,
// //                 title: e.target.value
// //             });
// //         }}
// //         onBlur={(e) => {
// //             console.log("U{PDTEA")
// //             console.log(e.target.value);
// //             console.log(e.target.parentElement.id);
// //             console.log({...formData});
// //         }}
// //         />
        
// //         <img src="/051-user.svg" style={{display: "inline-block"}} width="40px" height="40px"></img>

// //         <span style={{display: "inline-block"}}>
// //             <H2>{formData.author} | {formData.date}</H2>
// //         </span>
// //         <P>Hey, we are meeting at X @ 7:00 PM. Bring a friend, and don't forget to reach out if you have any questions!</P>
// //         <div>
// //             {Object.keys(meta).map((o, i) => {
// //                 return (
// //                     <button key={i} 
// //                         onClick={(e) => {
// //                             e.preventDefault();
// //                             props.setExpand({on: !props.on})
// //                         }}
// //                     >{o}</button>
// //                 )
// //             })}
// //         </div>
// //     </CardLayout>)
// // }

// // const ExpandedCard = (props) => (
// //     <ExpandedCardLayout show={props.show}>

// //     </ExpandedCardLayout>
// // )

// // const CardContainerGrid = styled.div`
// //     display: grid;
// // `;

// // const FullCard = (props) => {

// //     const [expand, setExpand] = useState({on: false});
// //     const [editing, setEditing] = useState({editing: false});
// //     return (
// //         <CardContainerGrid className={`${props.id}`}>
// //             <ExpandedCard show={expand.on} />
// //             <Card setExpand={setExpand} on={expand.on} editing={editing.editing} setEditing={setEditing} {...props}/>
            
// //         </CardContainerGrid>
// //     )
// // }


// function TestCard({ data, ...props }){
//   console.log('Card data', data);
//   console.log('Props', props);
//   return null;
// }

// export default withGetCard(TestCard);
