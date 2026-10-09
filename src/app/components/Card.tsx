import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
type Props = {
  props: {
    slug: string;
    image: string;
    nameBn: string;
    today: number;
    unit: string;
    change: { dir: "up" | "down" | "flat"; pct: number };
  };
};

const Card = ({ props }: Props) => {
  const color =
    props.change.dir === "up"
      ? "text-red-600"
      : props.change.dir === "down"
      ? "text-green-600"
      : "text-gray-500";

  return (
    <div className="card bg-base-100 w-full max-w-80 shadow-sm rounded-2xl">
        <Link href={`/product/${props.slug}`}>
            <div className="card-body hover:shadow-xl">
                <h2 className="card-title">
                <span className="text-4xl flex items-center justify-center bg-gray-100 rounded-2xl h-15 w-15">{props.image}</span>
                    <div>
                        <div>{props.nameBn}</div>
                        <div className="font-normal text-sm">

                            প্রতি {" "}
                            {props.unit === "kg" ? "কেজি" :
                            props.unit === "gram" ? "গ্রাম" :
                            props.unit === "liter" ? "লিটার" :
                            props.unit === "ml" ? "মিলিলিটার" :
                            props.unit === "piece" ? "পিস" :
                            props.unit === "dozen" ? "ডজন" :
                            props.unit === "packet" ? "প্যাকেট" :
                            props.unit === "bottle" ? "বোতল" :
                            props.unit === "pound" ? "পাউন্ড" :
                            props.unit === "maund" ? "মণ" :
                            props.unit
                            }
                        </div>
                    </div>
                    
                </h2>
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-semibold">
                        <div className="text-sm">
                            আজকের দাম
                        </div>
                        <div className="flex">
                            <div className="font-bold text-2xl">{props.today.toLocaleString("bn-BD")}</div>
                            <div className="text-sm pt-2.5 pl-2 font-semibold">টাকা</div>
                            

                        </div>
                        
                        
                    </div>
                    <div className={`${color} flex gap-2 bg-gray-100 w-18 h-5 rounded-2xl items-center justify-center`}>
                        <div>
                            {props.change.pct > 0 ? <FontAwesomeIcon className="h-5" icon={faCaretUp} style={{ color: "rgba(240, 0, 0, 1.00)" }}/> : props.change.pct < 0 ? <h2 className='text-green-500 pl-1'><FontAwesomeIcon className="h-5" icon={faCaretDown} style={{ color: "rgba(0, 240, 0, 1.00)" }}/></h2> : "–"}{" "}
                        </div>
                        <div className="font-bold">
                            {Math.abs(props.change.pct).toLocaleString("bn-BD", {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1,
                            })}
                            %
                        </div>
                    
                    
                    </div>
                </div>
            </div>
        </Link>
    </div>
  );
};

export default Card;