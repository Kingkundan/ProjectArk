import CardChip  from '../../assets/SVG/sim-card-chip.svg'
import Visa from '../../assets/SVG/visa-svgrepo-com.svg'

const Card = () => {
    return (
        <div className="p-4 mb-4 text-white bg-gradient-to-tr from-sky-400 via-blue-600 to-violet-600 rounded-xl">
            <div className='flex justify-between'>
            <p className="mb-2 text-sm">DEBIT CARD</p>
            <img src={Visa} alt="Visa logo" className="w-10 h-10" />
            </div>
            <p className="mb-4 text-xl">•••• •••• •••• 4529</p>
            <div className="flex items-end justify-between">
                <div>
                    <p className="mb-1 text-xs">Card holder name</p>
                    <p className="font-semibold">Sakib Hasan</p>
                </div>
                <div>
                    <p className="mb-1 text-xs">Expire Date</p>
                    <p className="font-semibold">12/24</p>
                </div>
                <img src={CardChip} alt="Visa logo" className="w-10 h-10" />
            </div>
        </div>
    )
}

export default Card