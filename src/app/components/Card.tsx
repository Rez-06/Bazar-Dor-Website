import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  props: {
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
    <div className="card bg-base-100 w-full shadow-sm">
      <div className="card-body">
        <h2 className="card-title">
          <span className="text-4xl">{props.image}</span>
          {props.nameBn}
        </h2>
        <p className="text-2xl font-semibold">
          ৳{props.today.toLocaleString("bn-BD")}
          <span className="text-sm font-normal"> / {props.unit}</span>
        </p>
        <p className={color}>
          {props.change.pct > 0 ? <FontAwesomeIcon className="h-5" icon={faCaretUp} style={{ color: "rgba(240, 0, 0, 1.00)" }}/> : props.change.pct < 0 ? <h2 className='text-green-500 pl-1'></h2> : "–"}{" "}
          {Math.abs(props.change.pct).toLocaleString("bn-BD")}%
        </p>
      </div>
    </div>
  );
};

export default Card;