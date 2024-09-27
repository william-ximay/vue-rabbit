import httpInstance from "@/utils/http";
export function getNew () {
  return httpInstance({
    url: '/home/new'
  })
}