



import React from 'react'
import {catagoryInfos} from "./Catagoryfulllinfos"
import CatagoryCard from './CatagoryCard';
import classes from './catagory.module.css'

function Catagory() {
  return (
   <section className={classes.catagory_container}>
      {
      catagoryInfos.map((infos) => (
        <CatagoryCard data={infos} />
))}
    </section>
  )
}
export default Catagory


