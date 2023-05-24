import React from 'react'
import { Link } from 'react-router-dom'
import carloan from '../../../assets/carloan.svg'
import personalloan from '../../../assets/personalloan.svg'
import './Loan.css'
import Header from '../../components/Header'
import "tachyons";
import LoanCards from '../../components/LoanCards'
import { useDispatch, useSelector } from 'react-redux'

function Loan() {
    const dispatch = useDispatch();
    const loans = useSelector((state) => {
      return state.clients[0].loans.personalLoan
    })
    return (
        // <div>
        //   <Header className='tc' title='Loans' subtitle=''/>
        //   <div class="fl w-100 w-50-ns pa2 ">
        //     <Link to='CarLoanForm'><div class="box zone "><img src={carloan} />Car Loan</div></Link>
        //     <Link to='PersonalLoanForm'><div class="box zone "><img src={personalloan} />Personal loan</div></Link>
        //   </div>
        // </div>

        <div >
            <h1 class="mw5 center pa3 ph5-ns">Loans</h1>
            <h2 class="mw5  pa3 ph5-ns">Current Loans</h2>
            {loans.map((loan)=>{
                return <LoanCards loan={loan}/>
            })}
            <div class="cf ph2-ns">
                <h3 class="mw5  pa3 ph5-ns">Apply for Loans</h3>
                <div class="fl w-100 w-50-ns pa2">
                    <Link to='CarLoanForm'><div class="box zone pv7  "><img src={carloan} />Car Loan</div></Link>
                </div>
                <div class="fl w-100 w-50-ns pa2">
                    <Link to='PersonalLoanForm'><div class="box zone pa7"><img src={personalloan} />Personal loan</div></Link>
                </div>
            </div>
        </div>
    )
}

export default Loan