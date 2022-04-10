import Link from "next/link";
function Log(data:string) {
    console.log(data)
    return (<>asdf</>)
//   if (data.data.data === "logup") {
//     return (
//       <>
//         <h2 className="text-base mr-2">Бүртгэлтэй бол?</h2>
//         <Link href="/signin">
//           <a className="font-semibold">Нэвтрэх</a>
//         </Link>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <h2 className="text-base mr-2">Бүртгэлгүй юу?</h2>
//         <Link href="/signup">
//           <a className="font-semibold">Бүртгүүлэх</a>
//         </Link>
//       </>
//     );
//   }
}
export default function Navbar(data: string) {
  return (
    <div className='flex justify-end w-full pr-10 py-4'>
      <Log data={data} />
    </div>
  );
}
