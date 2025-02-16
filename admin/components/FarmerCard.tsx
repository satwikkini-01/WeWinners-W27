import Link from "next/link";

function FarmerCard({ farmer, deleteFarmer }) {
    return (
        <tr className="border-t">
            <td className="p-2">{farmer.name}</td>
            <td className="p-2">{farmer.location}</td>
            <td className="p-2">
                <Link
                    href={`/farmers/${farmer.id}`}
                    className="text-blue-500 hover:underline"
                >
                    Edit
                </Link>
                <button
                    className="text-red-500 ml-4"
                    onClick={() => deleteFarmer(farmer.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default FarmerCard;
