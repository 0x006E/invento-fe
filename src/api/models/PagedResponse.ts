/**
 * Interface representing the response of a paged data request.
 * @template T - Type of the paged data content.
 */
export interface PagedResponse<T> {
  /**
   * The total number of pages in the result set.
   */
  totalPages: number;
  /**
   * The total number of elements in the result set.
   */
  totalElements: number;
  /**
   * The requested size of the page.
   */
  size: number;
  /**
   * The content of the page.
   */
  content: T[];
  /**
   * The page number of the current page.
   */
  number: number;
  /**
   * The sort information of the page.
   */
  sort: Sort;
  /**
   * The pageable information of the page.
   */
  pageable: Pageable;
  /**
   * The number of elements in the current page.
   */
  numberOfElements: number;
  /**
   * Indicates if the current page is the first page in the result set.
   */
  first: boolean;
  /**
   * Indicates if the current page is the last page in the result set.
   */
  last: boolean;
  /**
   * Indicates if the result set is empty.
   */
  empty: boolean;
}

/**
 * Interface representing the sort information of a page.
 */
export interface Sort {
  /**
   * Indicates if the sort is empty.
   */
  empty: boolean;
  /**
   * Indicates if the sort is sorted.
   */
  sorted: boolean;
  /**
   * Indicates if the sort is unsorted.
   */
  unsorted: boolean;
}

/**
 * Interface representing the pageable information of a page.
 */
export interface Pageable {
  /**
   * The offset of the page.
   */
  offset: number;
  /**
   * The sort information of the page.
   */
  sort: Sort;
  /**
   * The page number of the current page.
   */
  pageNumber: number;
  /**
   * The requested size of the page.
   */
  pageSize: number;
  /**
   * Indicates if the page is unpaged.
   */
  unpaged: boolean;
  /**
   * Indicates if the page is paged.
   */
  paged: boolean;
}
