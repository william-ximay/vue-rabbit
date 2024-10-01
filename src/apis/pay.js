import httpInstance from "@/utils/http"
export function payAPI (id) {
  return httpInstance({
    url: `/member/order/${id}`
  })
}