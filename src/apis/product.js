import httpInstance from "@/utils/http";
export function getProducts () {
  return httpInstance({
    url: '/home/goods'
  })
}