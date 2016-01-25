<?php
class Display
{
	//게시판 및 기타 페이지 구현이 필요한 곳에서 사용
	public static function pageNumber($totcnt, $bWork, $href, $param, $pgInx)
	{
		//여기부터 페이지 번호 구현부
		if ($totcnt > 0)
		{
			$pageGroupInx = (int)(($pgInx-1) / $bWork->page_group_size);
			
			echo "<td>";
			//이전 그룹 버튼
			if ($pageGroupInx > 0)
			{
				$newInx = ($pageGroupInx - 1) * $bWork->page_group_size + 1;
				echo "<a class='prev-group' href='$href?$param&pg_inx=$newInx'><img class='bottom_btn' src='../../images/board/lleft.png' alt='처음으로 가기'></a>";
			}
			
			//이전 페이지 버튼
			if ($pgInx > 1)
			{
				$newInx = $pgInx - 1;
				echo "<a class='prev-page' href='$href?$param&pg_inx=$newInx'><img class='bottom_btn' src='../../images/board/left.png' alt='이전페이지로 가기'></a>";
			}
			echo "</td>";
		
			//현재 그룹의 시작 페이지 번호
			$start = $pageGroupInx * $bWork->page_group_size;
			
			//현재 보여지는 페이지 그룹의 페이지 개수 
			//소수점이 나오도록 한다.(1.1 이상이면 2페이지가 보여진다.)
			$pageCount = ($totcnt - $start * $bWork->page_size) / $bWork->page_size;
			//그룹 사이즈보다 크면 최대값으로 다시 셋팅
			if ($pageCount>=$bWork->page_group_size) {
			    $pageCount = $bWork->page_group_size;
			}
			
			//페이지 번호가 1 부터 시작되므로 
			$start++;
			$end = $start + $pageCount;
			
		    echo "<td>";  
            for(; $start < $end; $start++)
			{
				if ($start == $pgInx) {
                    echo "<li><strong class='board-button-selected'>$start</strong></li>";   
				}
				else {
				    echo "<li><a class='board-button' href='$href?$param&pg_inx=$start'>$start</a></li>";
				} 
			}
			echo "</td>";
			
			echo "<td>"; 
			//다음 페이지 버튼
			//소수점이 나오도록 한다.(1.1 이상이면 다음 페이지 버튼이 보여진다.)
			if ($pgInx<$totcnt / $bWork->page_size)
			{
				$newInx = $pgInx + 1;
				echo "<a class='next-page' href='$href?$param&pg_inx=$newInx'><img class='bottom_btn' src='../../images/board/right.png' alt='다음페이지로 가기'></a>";
			}
			//다음 그룹 버튼
			if ($pageGroupInx < (int)($end/$bWork->page_group_size))
			{
				$newInx = ($pageGroupInx + 1) * $bWork->page_group_size + 1;
				echo "<a class='next-group' href='$href?$param&pg_inx=$newInx'><img class='bottom_btn' src='../../images/board/rright.png' alt='맨끝으로 가기'></a>";
			}
			echo "</td>";
		}
	}
}
?>