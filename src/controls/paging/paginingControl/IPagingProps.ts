export interface IPagingProps {
  onNextPage?: (index: number) => void; // Executed onNextPage button click
  onPrevPage?: (index: number) => void; // Executed onPrevPage button click

  showFooterNavigation?: boolean; // Should 'dot' navigation be shown
  showArrowsNavigation?: boolean; // Should 'arrows' navigation been displayed
}
