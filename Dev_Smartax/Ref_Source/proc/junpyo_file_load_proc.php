<?php
	require_once("../class/excel_reader2.php");
	require_once("../class/ohjicXlsxReader.php");
	$filePath = $_POST['filePath'];
	$match_customer_id = $_POST['match_customer_id'];
	
	try
	{
		$ext = explode ('.', $filePath);
		$ext = $ext [count ($ext) - 1];
		
		if($ext == 'xls')
		{
			//xls 파일만 파싱 가능 
			$data = new Spreadsheet_Excel_Reader($filePath, false);
			$result=array();
			$idx = 2;
			while(trim($data->val($idx,'A'))!='')
			{
				//$value = $data->type($idx,'A');
				//$value = $data->info($idx,'A');
				//$value = $data->val($idx,'A');
				
				//throw new Exception($value);
				
				$dateTime = $data->val($idx,'A');
				$year = substr($dateTime,0,4);
				$month = substr($dateTime,5,2);
				$day = substr($dateTime,8,2);
				
				$note = trim($data->val($idx,'B'));
				$out = str_replace(',','',trim($data->val($idx,'C')));
				$in = str_replace(',','',trim($data->val($idx,'D')));
		
				$item['jp_date_y']=$year;
				$item['jp_date_m']=$month;
				$item['jp_date_d']=$day;
				
				$item['jp_yyyymmdd']=$year.$month.$day;
				$item['match_customer_id']=$match_customer_id;
				
				$item['jp_rem']=$note;
				$item['credit']=$in;
				$item['debit']=$out;
				
				if($item['credit']==0)
				{
					$item['jp_view_gubun']=5;
				}
				else 
				{
					$item['jp_view_gubun']=6;
				}
				
				//array_push($result,$item);
				array_unshift($result,$item);
				$idx++;
			}
		}
		else if($ext == 'xlsx')
		{
			//xlsx 파일만 파싱 가능 
			$data = new ohjicXlsxReader();
			$data->init($filePath);
			$data->load_sheet(1);
		 
			$result=array();
			$idx = 1;
			
			while(trim($data->valString($idx,'A'))!='')
			{
				$dateTime = $data->valDate($idx,'A');
				//throw new Exception($dateTime);
				
				$year = substr($dateTime,0,4);
				$month = substr($dateTime,5,2);
				$day = substr($dateTime,8,2);
				
				$item['jp_yyyymmdd']=$year.$month.$day;
				$item['match_customer_id']=$match_customer_id;
				
				$note = trim($data->valString($idx,'B'));
				$out = str_replace(',','',trim($data->valNumber($idx,'C')));
				$in = str_replace(',','',trim($data->valNumber($idx,'D')));
				
				$item['jp_date_y']=$year;
				$item['jp_date_m']=$month;
				$item['jp_date_d']=$day;
				$item['jp_rem']=$note;
				$item['credit']=$in;
				$item['debit']=$out;
				
				if($item['credit']==0)
				{
					$item['jp_view_gubun']=5;
				}
				else
				{
					$item['jp_view_gubun']=6;
				}
				
				array_unshift($result,$item);
				$idx++;
				
				/*
				$dateTime = $data->val($idx,0);
				//throw new Exception($dateTime);
				
				$year = substr($dateTime,0,4);
				$month = substr($dateTime,5,2);
				$day = substr($dateTime,8,2);
				
				$item['jp_yyyymmdd']=$year.$month.$day;
				$item['match_customer_id']=$match_customer_id;
				
				$note = trim($data->val($idx,1));
				$out = str_replace(',','',trim($data->val($idx,2)));
				$in = str_replace(',','',trim($data->val($idx,3)));
		
				$item['jp_date_y']=$year;
				$item['jp_date_m']=$month;
				$item['jp_date_d']=$day;
				$item['jp_rem']=$note;
				$item['credit']=$in;
				$item['debit']=$out;
				
				if($item['credit']==0)
				{
					$item['jp_view_gubun']=5;
				}
				else 
				{
					$item['jp_view_gubun']=6;
				}
				
				array_unshift($result,$item);
				$idx++;
				*/
			}
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
	}
	catch (Exception $e) 
	{
		$err = $e -> getMessage();
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}	
	
?>