import React from 'react'

type ListingType = {
  accounts: ListingDataType[]
  ledger: ListingDataType[]
}
type ListingDataType = {
  targetUrl: string,
  name: string
}
type ListingCompomentType = {
  title: string,
  data: ListingDataType[]
}

function HomePage() {
  const listing: ListingType = {
    accounts: [
      { targetUrl: "/accounts", name: "Accounts" },
      { targetUrl: "/accounts/5", name: "Accounts Id: 5" },
      { targetUrl: "/accounts/add", name: "Accounts Adding" },
      { targetUrl: "/accounts/update/5", name: "Accounts Update Id: 5" },
    ],
    ledger: [
      { targetUrl: "/ledger/groupByDate", name: "Ledgers" },
      { targetUrl: "/ledger/10", name: "Ledger Id: 10" },
      { targetUrl: "/ledger/add", name: "Ledger Adding" },
      { targetUrl: "/ledger/update/10", name: "Ledger Update Id: 10" },
    ]
  }
  return (
    <div>
      <div className='mx-5 my-5'>
        <Listing title="Accounts" data={listing.accounts}></Listing>
        <Listing title="Ledgers" data={listing.ledger}></Listing>
      </div>
    </div>
  )
}

function Listing({ title, data }: ListingCompomentType) {
  const variants = {
    listing: `
     mx-5 text-cyan-700
     hover:text-cyan-300
    `
  }
  return <>
    <div>
      <p>{title}</p>
      <ul>
        {data !== undefined ? data.map((item) => {
          return <>
            <li><a className={variants.listing} href={item.targetUrl}>{item.name}</a></li>
          </>
        }) : ""}
      </ul>
    </div>
  </>
}

export default HomePage