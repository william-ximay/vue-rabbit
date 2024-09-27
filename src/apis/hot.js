import httpInstance from "@/utils/http";
export function getHot () {
  return httpInstance({
    url: '/home/hot'
  })
}