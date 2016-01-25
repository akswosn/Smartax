<?php
// error_reporting(E_ALL);
ini_set ( 'memory_limit', - 1 ); // 엑셀 가져오다가 뻗을 수 있으므로 메모리는 무한대로~
set_time_limit ( 0 );
class ohjicXlsxReader {
	function Exl2phpTime($tRes, $dFormat = "1900") {
		if ($dFormat == "1904")
			$fixRes = 24107.375;
		else
			$fixRes = 25569.375;
		
		$dateVal = intval ( (($tRes - $fixRes) * 86400) );
		return date ( "Y-m-d", $dateVal );
		// return intval( ( ( $tRes - $fixRes) * 86400 ) );
	}
	function init($inputFileName) {
		$this->xlsx = $inputFileName;
		
		$this->zip = zip_open ( $this->xlsx );
		$this->string_pack = array ();
		
		if ($this->zip) {
			
			while ( $zip_entry = zip_read ( $this->zip ) ) {
				
				if (zip_entry_name ( $zip_entry ) == 'xl/sharedStrings.xml') { // / 텍스트는 모두 여기에 저장된다. 이렇게 해서 용량 줄이는 듯.
					if (zip_entry_open ( $this->zip, $zip_entry, "r" )) {
						
						$buf = zip_entry_read ( $zip_entry, zip_entry_filesize ( $zip_entry ) );
						
						$arr = simplexml_load_string ( $buf );
						
						$obja = $arr->si;
						
						$length = sizeof ( $obja );
						
						for($i = 0; $i < $length; $i ++) {
							
							$this->string_pack [$i] = ( string ) $obja [$i]->t; // xml 파서에서 simplexml 오브젝트가 아니라 단순 배열 구조로 리턴해준다면 더 빨리 진행 될 수 있을 듯 simplexml 에 호출시 할 수 있는게 있지 않을까?
						}
						
						zip_entry_close ( $zip_entry );
					}
				}
			}
		}
		
		$this->close ();
	}
	function close() {
		zip_close ( $this->zip );
	}
	function load_sheet($sheet_index) {
		$this->zip = zip_open ( $this->xlsx );
		
		if ($this->zip) {
			
			while ( $zip_entry = zip_read ( $this->zip ) ) {
				
				if (zip_entry_name ( $zip_entry ) == 'xl/worksheets/sheet' . $sheet_index . '.xml') { // 실제 로드되는 파일
					
					if (zip_entry_open ( $this->zip, $zip_entry, "r" )) {
						
						$buf = zip_entry_read ( $zip_entry, zip_entry_filesize ( $zip_entry ) );
						
						$arr = simplexml_load_string ( $buf );
						
						$this->rows = &$arr->sheetData->row;
						
						$this->rowsize = sizeof ( $this->rows ); // dimension 을 파싱해서 써도 되지만 구찬아서.;
						if ($this->rowsize > 0) {
							$this->colsize = ( int ) array_pop ( explode ( ":", ( string ) $this->rows [0] ['spans'] ) ); // 1:7 이런식으로 값이 들어있음.
						} else {
							$this->colsize = 0;
						}
						
						zip_entry_close ( $zip_entry );
					} // if
				}
			} // while
		} // if this zip
	} // method
	function val($y, $x) {
		$cols = $this->rows [$y]->c;
		
		if (isset ( $cols [$x] )) {
			$col = $cols [$x];
			
			if (isset ( $col ['t'] ) && ( string ) $col ['t'] == 's') { // 문자일 경우
				$value = $this->string_pack [( int ) $col->v];
			} else if (isset ( $col ['s'] ) && (( string ) $col ['s'] == '8' || ( string ) $col ['s'] == '1' || ( string ) $col ['s'] == '16')) { // 날짜 일 경우
				$value = $this->Exl2phpTime ( ( float ) $col->v );
			} else {
				$value = ( string ) $col->v;
			}
			
			// $f = $col->f;
			/*
			 * if(isset($col['s']) &&(string)$col['s']=='11' && isset($f) && isset($f['si']) && (string)$f['si'=='0'])
			 * {
			 * $value = '';
			 * }
			 * else if(isset($col['t']) && (string)$col['t']=='s'){	// 문자일 경우
			 *
			 * $value = $this->string_pack[(int)$col->v];
			 *
			 *
			 * }
			 * else if(isset($col['s']) &&((string)$col['s']=='8'|| (string)$col['s']=='1'))
			 * {	// 날짜 일 경우
			 *
			 * $value = $this->Exl2phpTime((float)$col->v);
			 *
			 * }
			 * else
			 * {
			 * $value = (string)$col->v;
			 *
			 * }
			 */
			/*
			 *
			 * if(isset($col['t']) && (string)$col['t']=='s'){	// 문자일 경우
			 *
			 * $value = $this->string_pack[(int)$col->v];
			 *
			 *
			 * }else if(isset($col['s']) && (string)$col['s']=='1'){	// 날짜 일 경우
			 *
			 * $value = $this->Exl2phpTime((float)$col->v);
			 *
			 * }else{
			 * $value = (string)$col->v;
			 *
			 * }
			 *
			 * //
			 *
			 * if(isset($col['s']) && (string)$col['s']=='1'){	// 날짜 일 경우
			 *
			 * $value = $this->Exl2phpTime((float)$col->v);
			 *
			 * }
			 * else if(isset($col['t']) && (string)$col['t']=='s')
			 * {	// 문자일 경우
			 *
			 * $value = $this->string_pack[(int)$col->v];
			 *
			 *
			 * }else{
			 * $value = (string)$col->v;
			 * }
			 */
			// $value = $this->Exl2phpTime((float)$col->v);
		} else {
			$value = '';
		}
		
		return $value;
	}
	
	function val2($y, $x) {
		$col_code = $x . ($y + 1);
	
		$cols = $this->rows [$y]->c;
		$length = sizeof ( $cols );
		// throw new Exception($col_code);
		// throw new Exception($length);
		$value = '';
		for($i = 0; $i < $length; $i ++) {
			// $col = $cols[$i];
			// throw new Exception($col['r'].$col_code);
				
			if (isset ( $cols [$i] )) {
				$col = $cols [$i];
				if (isset ( $col ['r'] ) && ( string ) $col ['r'] == $col_code) {
					// if($x=='C') throw new Exception($col['s'].$col_code);
					if (isset ( $col ['t'] ) && ( string ) $col ['t'] == 's') { // 문자일 경우
						$value = $this->string_pack [( int ) $col->v];
					} else if (isset ( $col ['s'] ) && (( string ) $col ['s'] == '2' || ( string ) $col ['s'] == '3' || ( string ) $col ['s'] == '3' || ( string ) $col ['s'] == '3')) { // 일반 숫자인 경우
						$value = ( string ) $col->v;
					} else if (isset ( $col ['s'] )) { // 날짜 일 경우
						$value = $this->Exl2phpTime ( ( float ) $col->v );
					} 					
					/*
					* //현재까지 찾은 날짜 타입
					* else if(isset($col['s']) &&((string)$col['s']=='11'||(string)$col['s']=='10'
					* ||(string)$col['s']=='1'|| (string)$col['s']=='8'|| (string)$col['s']=='13'
					* ||(string)$col['s']=='14'))
						* {	// 날짜 일 경우
						* $value = $this->Exl2phpTime((float)$col->v);
						* }
					*/
					else {
						$value = ( string ) $col->v;
					}
					return $value;
				}
			}
		}
	
		return $value;
	}
	
	function valString($y, $x) {
		$col_code = $x . ($y + 1);
		
		$cols = $this->rows [$y]->c;
		$length = sizeof ( $cols );
		$value = '';
		for($i = 0; $i < $length; $i ++) {
			if (isset ( $cols [$i] )) {
				$col = $cols [$i];
				if (isset ( $col ['r'] ) && ( string ) $col ['r'] == $col_code) {
					if (isset ( $col ['t'] ) && ( string ) $col ['t'] == 's') { // 문자일 경우
						$value = $this->string_pack [( int ) $col->v];
					}
					else
					{
						$value = ( string ) $col->v;
					}
					return $value;
				}
			}
		}
		return $value;
	}
	
	
	//일반 문자 또는 날짜 타입
	function valDate($y, $x) {
		$col_code = $x . ($y + 1);
		$cols = $this->rows [$y]->c;
		$length = sizeof ( $cols );
		$value = '';
		for($i = 0; $i < $length; $i ++) {
			if (isset ( $cols [$i] )) {
				$col = $cols [$i];
				if (isset ( $col ['r'] ) && ( string ) $col ['r'] == $col_code) {
					
					if (isset ( $col ['t'] ) && ( string ) $col ['t'] == 's') { // 문자일 경우
						$value = $this->string_pack [( int ) $col->v];
					}
					
					$year = substr($value,0,4);
					$month = substr($value,5,2);
					$day = substr($value,8,2);
					
					if ($year == '' || $month== '' || $day=='') {  // 날짜 일 경우
						$value = $this->Exl2phpTime ( ( float ) $col->v );
					} 	
						
					return $value;
				}
			}
		}
		return $value;
	}
	
	function valNumber($y, $x) {
		$col_code = $x . ($y + 1);
		$cols = $this->rows [$y]->c;
		$length = sizeof ( $cols );
		$value = '';
		for($i = 0; $i < $length; $i ++) {
			if (isset ( $cols [$i] )) {
				$col = $cols [$i];
				
				if (isset ( $col ['r'] ) && ( string ) $col ['r'] == $col_code) {
					//if($x=='D') throw new Exception($col['s'].$col_code);
					
					if (isset ( $col ['t'] ) && ( string ) $col ['t'] == 's') { // 문자일 경우
						$value = $this->string_pack [( int ) $col->v];
					}
					else 
					{
						// 숫자일 경우
						$value = ( string ) $col->v;
					} 	
					return $value;
				}
			}
		}
	
		return $value;
	}
} // class

?>