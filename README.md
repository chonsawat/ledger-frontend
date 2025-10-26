# Frontend for Ledger App
Stack: React + Vite + Bun

## Progression
- [ ] Account Delete
- [ ] Account Update
- [ ] Account Add
- [ ] Account Detail
- [x] Account Listing
- [ ] Ledger Delete
- [ ] Ledger Update
- [x] Ledger Add
- [x] Ledger Detail
- [x] Ledger Listing

## Required
```
"http://${API_URL}/api/ledger-desc" -- as GET Method for listing ledger
"http://${API_URL}/api/ledger/:theId" -- as GET Method for detail ledger
"http://${API_URL}/api/ledger" -- as POST Method for create ledger
"http://${API_URL}/api/accounts" -- as GET Method for Listing Account
```
Reference backend by: ![https://github.com/chonsawat/ledger-backend](https://github.com/chonsawat/ledger-backend)

## Screenshot
Account Listing
![](./README/accounts-listing.png)

Ledger Listing
![](./README/ledger-listing.png)

Ledger Search
![](./README/ledger-search.png)

Ledger Detail
![](./README/ledger-detail.png)

Ledger Add
![](./README/ledger-add.png)