import { useNavigate } from "react-router"

function LedgerAdding() {
    const navigate = useNavigate()
    return (
        <div className="my-5">
            <form action="#" method="POST" className="border rounded rounded-xl ml-2 mr-4">
                <div className="flex my-2 mx-2 mt-5">
                    <p className="mr-2">Date: </p>
                    <input type="text" placeholder="Date" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Description: </p>
                    <input type="text" placeholder="Description" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Account: </p>
                    <input type="text" placeholder="Credit Account" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Credit Amount: </p>
                    <input type="text" placeholder="Credit Amount" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Debit Account: </p>
                    <input type="text" placeholder="Debit Account" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Debit Amount: </p>
                    <input type="text" placeholder="Debit Amount" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Total Credit Balance: </p>
                    <input type="text" placeholder="Total Credit Balance" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="flex my-2 mx-2">
                    <p className="mr-2">Total Debit Balance: </p>
                    <input type="text" placeholder="Total Debit Balance" className="border rounded rounded-sm" />
                    <br />
                </div>
                <div className="mb-3 mx-3">
                    <button className="hover:cursor-pointer hover:bg-lime-700 rounded rounded-xl bg-lime-500 text-white px-5 py-1" type="submit">Add</button>
                    <a className="hover:cursor-pointer hover:bg-red-700 rounded rounded-xl bg-red-500 text-white px-5 py-1.25 ml-2" onClick={() => {navigate(-1)}}>Back</a>
                </div>
            </form>
        </div>
    )
}

export default LedgerAdding