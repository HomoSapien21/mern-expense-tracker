import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";
import axios from "axios";
import { useEffect } from "react";

const useGetExpenses = () => {
    const dispatch = useDispatch();
    const { category, markAsDone } = useSelector(store => store.expense);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        // Only fetch expenses if user is authenticated
        if (!user) {
            return;
        }

        const fetchExpenses = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.status === 200) {
                    dispatch(setExpenses(res.data.expense));
                }
            } catch (error) {
                console.log("Error fetching expenses:", error);
                console.log("Error response:", error.response?.data);
                console.log("Error status:", error.response?.status);
            }
        }
        fetchExpenses();
    }, [dispatch, category, markAsDone, user])
}

export default useGetExpenses