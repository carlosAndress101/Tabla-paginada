import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Button,
  Chip,
  Input,
  Progress
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "#",
  "identificacion",
  "nombres",
  "fecha_nacimiento",
  "tiempo_contrato",
  "valor_contrato",
  "estado",
];



function Tabla() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = employees.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(employees.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1)

function prevPage(){
    if(currentPage !== firstIndex){
        setcurrentPage(currentPage - 1)
    }
}
function changeCPage(id){
    setcurrentPage(id)
}
function nextPage(){
    if(currentPage !== lastIndex){
        setcurrentPage(currentPage + 1)
    }
}

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://89.116.25.43:3500/api/empleados/listar"
        );
        const data = await response.json();
        setEmployees(data.result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    fetchData();
  }, []);


  return (
    <Card className="h-full w-full border rounded-xl pt-2">
        <CardBody className="px-0 ">
            <table className="w-full min-w-max table-auto text-left ">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {records.map(({id, identificacion, nombres, fecha_nacimiento, tiempo_contrato, valor_contrato, estado}, index) => {
                    const isLast = index === employees.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return(
                        <tr key={id}>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {id}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {identificacion}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {nombres}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {fecha_nacimiento}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    <div className="flex w-full flex-col gap-4">
                                        <Progress value={tiempo_contrato} color="indigo" />
                                    </div>
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {valor_contrato}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Chip
                                        variant="ghost"
                                        size="sm"
                                        value={estado ? "Activo" : "Inactivo"}
                                        color={estado ? "green" : "red"}
                                />
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </CardBody>
        <CardFooter>
         <nav>
            <ul className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <li>
                    <Button variant="outlined" color="blue-gray" size="sm" disabled={currentPage <= 1 ? true : false} onClick={prevPage}><a href="#" >Previous</a></Button>
                </li>
                <div className="flex items-center gap-2">
                {
                    numbers.map((n, i) =>(

                        <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`}>
                            <IconButton variant="outlined" color="blue-gray" size="sm" onClick={()=> changeCPage(n)}>   
                                <a href="#">{n}</a>
                            </IconButton>
                        </li>
                    ))
                }
                </div>
                <li>
                    <Button variant="outlined" color="blue-gray" size="sm" onClick={nextPage}><a href="#" >Next</a></Button>
                </li>
            </ul>
         </nav>
         
      </CardFooter>
    </Card>
  );
}

export default Tabla;
