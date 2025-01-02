
interface QuoteType{
  label:string,
  author:string
}

const Quote:React.FC<QuoteType> = ({label, author}) => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div className="text-3xl font-bold">
               
                "{label}"

                </div>
                <div className="max-w-md text-xl font-semibold text-left mt-4">
                {author}
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default Quote