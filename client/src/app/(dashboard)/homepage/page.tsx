import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'

const Homepage = () => {
  const loggedIn = { name: "Jane Doe", email: 'abc@gmail.com'} 
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions with ease."
          />
        </header>

        <TotalBalanceBox
        accounts={[]}
        totalBanks={12031}
        totalCurrentBalance={1200}
        />

        RECENT TRANSACTION
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 1200}, {currentBalance: 2000}]}
      />
    </section>
  )
}

export default Homepage